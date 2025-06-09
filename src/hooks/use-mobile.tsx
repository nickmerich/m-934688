
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Enhanced mobile utilities with performance optimizations
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      // Debounce resize events for better performance
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return {
    ...screenSize,
    isMobile: screenSize.width < MOBILE_BREAKPOINT,
    isTablet: screenSize.width >= MOBILE_BREAKPOINT && screenSize.width < 1024,
    isDesktop: screenSize.width >= 1024,
    isSmallMobile: screenSize.width < 375,
    isLargeMobile: screenSize.width >= 375 && screenSize.width < MOBILE_BREAKPOINT,
    aspectRatio: screenSize.width / screenSize.height,
    isLandscape: screenSize.width > screenSize.height,
    isPortrait: screenSize.height > screenSize.width,
  }
}

// Device detection utilities
export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<string>('unknown')

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    
    if (/iphone|ipod/.test(userAgent)) {
      setDeviceType('ios')
    } else if (/ipad/.test(userAgent)) {
      setDeviceType('ipad')
    } else if (/android/.test(userAgent)) {
      setDeviceType('android')
    } else if (/windows phone/.test(userAgent)) {
      setDeviceType('windows-phone')
    } else {
      setDeviceType('desktop')
    }
  }, [])

  return deviceType
}

// Touch support detection
export function useTouchSupport() {
  const [hasTouch, setHasTouch] = useState(false)

  useEffect(() => {
    setHasTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore - legacy support
      navigator.msMaxTouchPoints > 0
    )
  }, [])

  return hasTouch
}

// Network status for progressive enhancement
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [connectionType, setConnectionType] = useState<string>('unknown')

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // @ts-ignore - experimental API
    if ('connection' in navigator) {
      // @ts-ignore
      setConnectionType(navigator.connection.effectiveType || 'unknown')
      
      // @ts-ignore
      const connection = navigator.connection
      const updateConnection = () => {
        setConnectionType(connection.effectiveType || 'unknown')
      }
      
      connection.addEventListener('change', updateConnection)
      
      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
        connection.removeEventListener('change', updateConnection)
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOnline, connectionType }
}
