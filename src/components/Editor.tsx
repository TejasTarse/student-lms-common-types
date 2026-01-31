import { useRef } from "react";
import JoditEditor from "jodit-react";

type Props = {
  placeholder?: string;
  content: string;
  setContent: (content: string) => void;
};

const Editor = ({ placeholder, content, setContent }: Props) => {
  const editorRef = useRef(null);

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

export default Editor;
