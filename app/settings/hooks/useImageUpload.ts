import * as ImageManipulator from 'expo-image-manipulator';
import { useGetSignedUrlMutation } from '@/src/api/userApiSlice';
import * as FileSystem from 'expo-file-system';

export const useImageUpload = () => {
  const [getSignedUrl] = useGetSignedUrlMutation();

  const compressAndUpload = async (imageUri: string): Promise<string> => {
    try {
      const compressedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 800 } }],
        { compress: 0.7 },
      );

      const fileExtension = compressedImage.uri.split('.').pop() || 'jpg';
      const mimeType = `image/${fileExtension}`;

      const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri, {
        size: true,
      });
      if (!fileInfo.exists) {
        throw new Error('Compressed file does not exist');
      }

      const signedUrlResponse = await getSignedUrl({
        original_name: `profile-image.${fileExtension}`,
        size: fileInfo.size,
        mime_type: mimeType,
      }).unwrap();
      // Upload compressed image to signed URL
      await fetch(signedUrlResponse.data, {
        method: 'PUT',
        body: compressedImage,
        headers: {
          'Content-Type': mimeType,
        },
      });
      return signedUrlResponse.data.split('?')[0];
    } catch (error) {
      console.error('Error in compressAndUpload:', error);
      throw error;
    }
  };

  return {
    compressAndUpload,
  };
};
