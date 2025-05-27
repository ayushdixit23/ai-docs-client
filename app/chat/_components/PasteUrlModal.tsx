import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, Paperclip } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PasteUrlModal({
    onConfirm,
    children,
}: {
    onConfirm: (url: string) => void;
    children: React.ReactNode;
}) {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    function isValidHttpsUrl(input: string) {
        const httpsUrlRegex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
        return httpsUrlRegex.test(input);
    }

    const handleSubmit = () => {
        const trimmedUrl = url.trim();

        if (!trimmedUrl) {
            setError("Please enter a URL");
            return;
        }

        if (!isValidHttpsUrl(trimmedUrl)) {
            toast.error("Please enter a valid URL");
            setUrl("");
            return;
        }

        onConfirm(trimmedUrl);
        setUrl("");
        setError("");
    };

    const handleUrlChange = (value: string) => {
        setUrl(value);
        if (error) {
            setError("");
        }
    };

    const handlePasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                setUrl(text);
                if (error) {
                    setError("");
                }
            }
        } catch (err) {
            console.log("Clipboard access not available");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

            <AlertDialogContent className="bg-[#121212] text-white border border-[#fff]/10 max-w-md">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#fff]/20 bg-blue-500/10"
                            aria-hidden="true"
                        >
                            <Link className="text-blue-400" size={16} strokeWidth={2} />
                        </div>
                        <AlertDialogHeader className="flex-1 text-left">
                            <AlertDialogTitle className="text-lg font-semibold">
                                Paste Documentation URL
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400 text-sm">
                                Paste your documentation which you want to learn
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </div>

                    <div className="space-y-3">
                        <div className="space-y-2">
                            <div className="relative">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleUrlChange(e.target.value)}
                                    placeholder="https://example.com/docs"
                                    className="w-full bg-[#1a1a1a] border border-[#fff]/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    autoFocus
                                />
                                <button
                                    onClick={handlePasteFromClipboard}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white hover:bg-[#fff]/5 rounded transition-all"
                                    title="Paste from clipboard"
                                >
                                    <Paperclip size={14} />
                                </button>
                            </div>
                            {error && <p className="text-red-400 text-xs">{error}</p>}
                        </div>

                        <div className="bg-[#1a1a1a] border border-[#fff]/5 rounded-md p-3">
                            <p className="text-yellow-400 text-xs font-medium mb-1">
                                📝 Note:
                            </p>
                            <p className="text-gray-400 text-xs">
                                Just paste link URL, don't add text in between or anywhere. URL
                                should be valid.
                            </p>
                        </div>
                    </div>
                </div>

                <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel
                        onClick={() => {
                            setUrl("");
                            setError("");
                        }}
                        className="text-white bg-[#212121] hover:bg-[#2a2a2a] hover:text-white/70 border border-[#fff]/10 hover:border-[#fff]/20 transition-all"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild className="bg-blue-600 hover:bg-blue-500">
                        <button
                            onClick={handleSubmit}
                            disabled={!url.trim()}
                            className=" disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded "
                        >
                            Generate
                        </button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
