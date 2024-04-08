import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext<any>({
  snackBar: {
    isVisible: false,
    message: "",
    actionText: "",
    onActionPress: () => {},
  },
  openSnackBar: () => {},
  closeSnackBar: () => {},
});

export const useSnackbarContext = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: { children: any }) => {
  const [snackBar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    actionText: "",
    backgroundColor: "",
    onActionPress: () => {},
  });

  const openSnackBar = (
    message: string,
    actionText: string,
    backgroundColor: string,
    onActionPress: () => void = () => {}
  ) => {
    setSnackbar({
      isVisible: true,
      message,
      actionText,
      backgroundColor,
      onActionPress,
    });
  };

  const closeSnackBar = () => {
    setSnackbar({
      isVisible: false,
      message: "",
      actionText: "",
      backgroundColor: "",
      onActionPress: () => {},
    });
  };

  return (
    <SnackbarContext.Provider value={{ snackBar, openSnackBar, closeSnackBar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
