import * as Clipboard from "expo-clipboard";

const copyToClipboard = async (text: string) => Clipboard.setStringAsync(text);

const fetchCopiedText = async () => Clipboard.getStringAsync();

export { copyToClipboard, fetchCopiedText };
