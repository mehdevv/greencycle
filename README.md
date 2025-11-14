# GreenCycle - Recycling Revolution

A modern web application for recycling management in Algeria.

## Build Configuration for Vercel

This project is configured to build with Vite and output to the `dist` directory.

### Vercel Deployment Settings

**IMPORTANT**: If you encounter the "No Output Directory named 'dist' found" error on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **General**
3. Scroll to **Build & Development Settings**
4. Configure the following:
   - **Framework Preset**: Vite (or Other)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Root Directory**: `./` (leave empty if root)

5. **Remove any Production Overrides**:
   - Go to **Settings** → **General** → **Production Overrides**
   - Remove any overrides for Output Directory
   - If you can't remove an override, contact Vercel support

6. **Redeploy** after making these changes

The `vercel.json` file is already configured correctly, but Vercel dashboard settings take precedence. Make sure the dashboard settings match the `vercel.json` configuration.

### Local Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

The build output will be in the `dist` directory.
