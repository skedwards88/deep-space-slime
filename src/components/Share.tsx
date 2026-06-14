import {useShareContext} from "./ShareContextProvider";

export default function Share({
  appName,
  text,
  url,
  seed,
  id,
  className,
  buttonText,
  origin = "unknown share",
}: {
  appName: string;
  text: string;
  url: string;
  seed?: string;
  id?: string;
  className: string;
  buttonText: string;
  origin?: string;
}): React.JSX.Element {
  const {shareAndCapHints} = useShareContext();

  if ("canShare" in navigator) {
    return (
      <button
        id={id}
        className={className}
        onClick={() => {
          shareAndCapHints({
            appName,
            text,
            url,
            seed,
            origin,
          });
        }}
      >
        {buttonText}
      </button>
    );
  } else {
    return <></>;
  }
}
