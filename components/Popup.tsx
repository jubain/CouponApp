import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Modal } from "native-base";

const Popup = (props: {
  isModalOpen: boolean;
  title: string;
  onModalClose: () => void;
}) => {
  return (
    <Modal isOpen={props.isModalOpen} onClose={props.onModalClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Body>
          <Text>Are you sure, you want to delete it?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={props.onModalClose}
            >
              Cancel
            </Button>
            <Button onPress={props.onModalClose}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({});
