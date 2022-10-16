import { ContractReceipt } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
export function useToast() {
  const triggerError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  const handlePromise = useCallback(
    (promise: Promise<ContractReceipt>, message: string) => {
      return toast.promise(promise, {
        pending: "Transaction is pending",
        success: `Successful ${message}👌`,
        error: "Something went wrong 🤯",
      });
    },
    []
  );

  return { triggerError, handlePromise };
}
