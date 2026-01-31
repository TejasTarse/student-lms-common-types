import { useEffect, useRef, useState } from "react";

type Props = {
  placeholder?: string;
  content: string;
  setContent: (content: string) => void;
};

const Editor = ({ placeholder, content, setContent }: Props) => {
  const editorRef = useRef<any>(null);

  // ⭐ use any to avoid component-type mismatch
  const [JoditEditor, setJoditEditor] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    const loadEditor = async () => {
      try {
        const mod = await import("jodit-react");

        if (mounted) {
          // ⭐ IMPORTANT FIX
          setJoditEditor(() => mod.default || mod);
        }
      } catch (err) {
        console.error("Failed to load Jodit editor", err);
      }
    };

    if (typeof window !== "undefined") {
      loadEditor();
    }

    return () => {
      mounted = false;
    };
  }, []);

  // SSR safe
  if (!JoditEditor) return null;

  const config = {
    readonly: false,
    placeholder: placeholder || "Start typing...",
    height: 350,
  };

  return (
    <JoditEditor
      ref={editorRef}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(val: string) => setContent(val)}
    />
  );
};

export default Editor; // ⭐ default export (recommended)
