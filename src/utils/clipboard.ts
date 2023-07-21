import * as Clipboard from "expo-clipboard";

const copyToClipboard = async () => Clipboard.setStringAsync("hello world");

const fetchCopiedText = async () => Clipboard.getStringAsync();

export { copyToClipboard, fetchCopiedText };
