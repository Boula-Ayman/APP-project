import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    transform: [{ translateY: 20 }, { translateX: -20 }],
  },
  backButton: {
    marginTop: 50,
    position: 'absolute',
    left: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: '50%',
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 200 }],
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    lineHeight: 21,
    color: '#000000',
    marginLeft: 10,
  },
  notificationContainer: {
    alignSelf: 'flex-start',
    transform: [{ translateY: -100 }],
    marginTop: 20,
  },
  notificationDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#464851',
  },
  notificationList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -30 }],
    gap: 25,
  },
  notificationItem: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0.9 }],
  },
  notificationTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  notificationTextEmpty: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    lineHeight: 25,
    color: '#242B42',
  },
  notificationTextStayTuned: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#686777',
    textAlign: 'center',
  },
  notificationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000000',
  },
  notificationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  notificationDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
  },
  newNotificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -95 }],
    gap: 15,
  },
  newNotificationTitleContainer: {
    transform: [{ translateY: -55 }, { translateX: -25 }],
  },
  count: {
    color: '#8BC240',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
  },
  newNotificationTitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },
  newNotificationItem: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    transform: [{ translateY: -50 }],
    borderWidth: 0.85,
    borderColor: '#8BC240',
    borderRadius: 20,
    padding: 20,
    width: 315,
  },
});

export default styles;
