import { useEffect } from 'react';

export function MobileInit() {
  useEffect(() => {
    // Only initialize mobile features if actually running in a Capacitor app
    // This prevents errors in browser development
    const initMobile = async () => {
      // Check if Capacitor is available (only in native mobile apps)
      if (typeof window === 'undefined' || !(window as any).Capacitor) {
        return; // Running in browser, skip mobile initialization
      }

      try {
        // Dynamically import Capacitor modules only when needed
        const { App } = await import('@capacitor/app');
        const { SplashScreen } = await import('@capacitor/splash-screen');
        const { StatusBar, Style } = await import('@capacitor/status-bar');

        // Hide splash screen after app loads
        await SplashScreen.hide();

        // Set status bar style to match black theme
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#000000' });

        // Handle back button on Android
        App.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            App.exitApp();
          } else {
            window.history.back();
          }
        });
      } catch (error) {
        console.error('Mobile initialization error:', error);
      }
    };

    initMobile();

    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && (window as any).Capacitor) {
        import('@capacitor/app').then(({ App }) => {
          App.removeAllListeners();
        }).catch(() => {
          // Ignore cleanup errors
        });
      }
    };
  }, []);

  // This component doesn't render anything
  return null;
}
