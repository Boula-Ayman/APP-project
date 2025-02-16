import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { useGetSignedUrlMutation } from "@/src/api/userApiSlice";
import * as FileSystem from 'expo-file-system';

type FileInfoSuccess = FileSystem.FileInfo & { exists: true; size: number; };

export const useImageUpload = () => {
    const [getSignedUrl] = useGetSignedUrlMutation();

    const compressImage = async (imageUri: string) => {
        const manipulator = ImageManipulator.manipulate(imageUri);
        manipulator.resize({ width: 500 });
        
        const result = await manipulator.renderAsync();
        return await result.saveAsync({
            compress: 0.7,
            format: SaveFormat.JPEG
        });
    };

    const validateFileInfo = async (uri: string): Promise<FileInfoSuccess> => {
        const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });
        if (!fileInfo.exists) {
            throw new Error('Compressed file does not exist');
        }
        return fileInfo as FileInfoSuccess;
    };

    const getImageUploadUrl = async (fileInfo: FileInfoSuccess, fileExtension: string) => {
        const mimeType = `image/${fileExtension}`;
        return await getSignedUrl({
            original_name: `profile-image.${fileExtension}`,
            size: fileInfo.size,
            mime_type: mimeType,
        }).unwrap();
    };

    const uploadToServer = async (signedUrl: string, fileUri: string, mimeType: string) => {
        const uploadResponse = await FileSystem.uploadAsync(signedUrl, fileUri, {
            httpMethod: 'PUT',
            headers: {
                'Content-Type': mimeType,
            }
        });

        if (uploadResponse.status !== 200) {
            throw new Error('Failed to upload image');
        }

        return signedUrl.split('?')[0];
    };

    const compressAndUpload = async (imageUri: string): Promise<string> => {
        try {
            const savedResult = await compressImage(imageUri);
            const fileInfo = await validateFileInfo(savedResult.uri);
            
            const fileExtension = savedResult.uri.split('.').pop() || 'jpg';
            const mimeType = `image/${fileExtension}`;
            
            const signedUrlResponse = await getImageUploadUrl(fileInfo, fileExtension);
            return await uploadToServer(signedUrlResponse.data, savedResult.uri, mimeType);
        } catch (error) {
            console.error('Error in compressAndUpload:', error);
            throw error;
        }
    };

    return {
        compressAndUpload
    };
};
