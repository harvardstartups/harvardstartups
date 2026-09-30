"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** Fall back to the source file if the image optimization endpoint fails. */
export function ReliableImage({ src, onError, unoptimized, ...props }: ImageProps) {
  const [failedSource, setFailedSource] = useState<ImageProps["src"] | null>(null);
  return <Image {...props} src={src} unoptimized={unoptimized || failedSource === src}
    onError={event => {
      setFailedSource(src);
      onError?.(event);
    }} />;
}
