import { useEffect, useState } from "react";

const useGetCategories = () => {
  //info modal
  const [isOpen, setIsOpen] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [successModal, setSuccessModal] = useState(true);

  const setStateModalHook = (open = false, message = "", success = successModal) => {
    setIsOpen(open);
    setMessageModal(message);
    setSuccessModal(success);
  };


  return [isOpen, messageModal, successModal, setStateModalHook]
};

export default useGetCategories;
