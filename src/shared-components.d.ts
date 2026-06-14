/// <reference types="react" />

type AnalyticsEvent = {
  eventName: string;
  eventInfo?: object;
};

declare module "@skedwards88/shared-components/src/logic/sendAnalyticsCF" {
  export function sendAnalyticsCF({
    userId,
    sessionId,
    analyticsToLog,
  }: {
    userId: string;
    sessionId: string;
    analyticsToLog: AnalyticsEvent[];
  }): void;
}

declare module "@skedwards88/shared-components/src/components/MetadataContextProvider" {
  export function useMetadataContext(): {userId: string; sessionId: string};
}

declare module "@skedwards88/shared-components/src/logic/isRunningStandalone" {
  export function isRunningStandalone(): boolean;
}

declare module "@skedwards88/shared-components/src/logic/getSeedFromDate" {
  export function getSeedFromDate(): string;
}

declare module "@skedwards88/shared-components/src/components/PWAInstall" {
  export default function PWAInstall<T extends string>({
    setDisplay,
    googleAppLink,
    appleAppLink,
    pwaLink,
  }: {
    setDisplay: React.Dispatch<React.SetStateAction<T>>;
    googleAppLink?: string;
    appleAppLink?: string;
    pwaLink?: string;
  }): React.JSX.Element;
}

declare module "@skedwards88/shared-components/src/components/InstallOverview" {
  export default function InstallOverview<T extends string>({
    setDisplay,
    setInstallPromptEvent,
    showInstallButton,
    installPromptEvent,
    googleAppLink,
    appleAppLink,
    userId,
    sessionId,
  }: {
    setDisplay: React.Dispatch<React.SetStateAction<T>>;
    setInstallPromptEvent: React.Dispatch<
      React.SetStateAction<Event | undefined>
    >;
    showInstallButton: boolean;
    installPromptEvent: Event | undefined;
    googleAppLink?: string;
    appleAppLink?: string;
    userId: string;
    sessionId: string;
  }): JSX.Element;
}

declare module "@skedwards88/shared-components/src/logic/handleInstall" {
  export function handleBeforeInstallPrompt(
    event: Event | undefined,
    setInstallPromptEvent: React.Dispatch<
      React.SetStateAction<Event | undefined>
    >,
    setShowInstallButton: React.Dispatch<React.SetStateAction<boolean>>,
  ): void;

  export function handleAppInstalled(
    setInstallPromptEvent: React.Dispatch<
      React.SetStateAction<Event | undefined>
    >,
    setShowInstallButton: React.Dispatch<React.SetStateAction<boolean>>,
  ): void;
}
