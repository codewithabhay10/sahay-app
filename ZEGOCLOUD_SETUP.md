# ZegoCloud Video Call Setup Guide

## Current Configuration

The video calling feature has been integrated using **ZegoCloud UIKit** with demo credentials. The implementation is complete and functional, but you should replace the demo credentials with your own for production use.

## Getting Your Own Credentials

### 1. Create ZegoCloud Account
- Visit: https://console.zegocloud.com/
- Sign up for a free account
- Verify your email

### 2. Create a Project
- Go to "Projects" in the dashboard
- Click "Create Project"
- Choose "UIKit" as the product type
- Select "Video Call" or "Video Conference"

### 3. Get Your Credentials
After creating a project, you'll receive:
- **App ID** (numeric value, e.g., 1484647939)
- **Server Secret** (alphanumeric string)

## Update the Credentials

### Option 1: Environment Variables (Recommended)
1. Create `.env.local` file in the project root:
```env
NEXT_PUBLIC_ZEGO_APP_ID=your_app_id_here
NEXT_PUBLIC_ZEGO_SERVER_SECRET=your_server_secret_here
```

2. Update `components/zego-meeting-room.tsx`:
```typescript
const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID || "0");
const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || "";
```

### Option 2: Direct Replacement
Edit `components/zego-meeting-room.tsx` at lines 18-19:
```typescript
const appID = YOUR_APP_ID; // Replace with your App ID
const serverSecret = "YOUR_SERVER_SECRET"; // Replace with your Server Secret
```

## Features Enabled

The current implementation includes:
- ✅ Video conferencing with up to 50 participants
- ✅ Screen sharing
- ✅ Text chat
- ✅ Audio/video toggle controls
- ✅ User list display
- ✅ Auto layout switching
- ✅ Join/leave notifications
- ✅ Front/back camera switching
- ✅ Audio/video settings

## Testing the Integration

1. Start the development server:
```bash
npm run dev
```

2. Navigate to: http://localhost:3000/pacc

3. Click "Join Meeting" on any upcoming meeting

4. The video call interface will load automatically

## Important Notes

⚠️ **Security Warning**: Never commit your actual credentials to version control. Always use environment variables for production.

⚠️ **Token Generation**: Currently using client-side token generation (for development). For production, generate tokens on your server to keep the secret secure.

⚠️ **Free Tier Limits**: 
- 10,000 free minutes per month
- 50 concurrent participants max
- Check ZegoCloud pricing for higher limits

## Customization Options

You can modify the video call experience in `components/zego-meeting-room.tsx`:

```typescript
zp.joinRoom({
  maxUsers: 50,                    // Max participants
  layout: "Auto",                  // "Auto", "Grid", "Sidebar"
  showScreenSharingButton: true,   // Enable/disable screen share
  showTextChat: true,              // Enable/disable chat
  turnOnCameraWhenJoining: true,   // Auto-start camera
  turnOnMicrophoneWhenJoining: true, // Auto-start mic
  // ... more options
});
```

## Troubleshooting

### Video not loading
- Check console for errors
- Verify credentials are correct
- Ensure you have camera/mic permissions in browser

### Connection issues
- Check firewall settings
- Verify network allows WebRTC connections
- Try different browser (Chrome/Firefox recommended)

### Build errors
- Ensure `@zegocloud/zego-uikit-prebuilt` is installed
- Run `npm install --legacy-peer-deps` if needed

## Support

- ZegoCloud Documentation: https://docs.zegocloud.com/
- ZegoCloud Console: https://console.zegocloud.com/
- GitHub Issues: Report integration issues in your repository
