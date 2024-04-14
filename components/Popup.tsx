import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Modal } from "native-base";
import { useDeleteCard, useDeleteImage } from "../hook/useCards";
import { useSnackbarContext } from "../hook/useSnackbar";
import { useUserContext } from "../hook/useUserContext";

const Popup = (props: {
  isModalOpen: boolean;
  title: string;
  onModalClose: () => void;
  selectedCard: any;
}) => {
  const [cardDeletedLoading, setCardDeletedLoading] = useState(false);
  const closeModal = () => {
    if (!cardDeletedLoading) {
      props?.onModalClose();
    }
  };

  const { openSnackBar } = useSnackbarContext();
  const { setRefetch } = useUserContext();

  const deleteModal = async () => {
    setCardDeletedLoading(true);
    await useDeleteImage(props?.selectedCard?.image);
    await useDeleteCard(props.selectedCard?.id);
    setRefetch(true);
    openSnackBar("Card deleted successfully", "Dismiss", "#00A300");
    setCardDeletedLoading(false);
    props?.onModalClose();
  };

  return (
    <Modal isOpen={props.isModalOpen} onClose={closeModal}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Body>
          <Text>Are you sure, you want to delete it?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={closeModal}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#C70039" }}
              onPress={deleteModal}
              disabled={cardDeletedLoading}
            >
              {!cardDeletedLoading ? "Yes" : <ActivityIndicator size="small" />}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({});
