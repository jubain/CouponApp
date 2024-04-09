import { GestureResponderEvent, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Button,
  FormControl,
  Icon,
  Input,
  Select,
  Spinner,
  Text,
  TextArea,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db } from "../config/firebase";
import "firebase/storage";
import { useSnackbarContext } from "../hook/useSnackbar";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useUserContext } from "../hook/useUserContext";
import { cardTypes, cards } from "../dummyData/dummyData";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

const AddCard = () => {
  const [imageDescription, setImageDescription] = useState<{
    url: any;
  }>({
    url: undefined,
  });

  const [uploadLoading, setUploadLoading] = useState(false);

  const navigation = useNavigation<any>();

  const { openSnackBar } = useSnackbarContext();
  const { user } = useUserContext();

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      company: "",
    },
    onSubmit: (values) => {
      uploadToFirebase((a: any) => {});
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Card name is required"),
      description: yup
        .string()
        .min(10, "Description must be at least 10 characters long")
        .required("Card description is required"),
      category: yup.string().required("Card category is required"),
      company: yup.string().required("Company is required"),
    }),
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageDescription({ ...imageDescription, url: result.assets[0].uri });
    }
  };

  const addCard = async (imageUrl: string) => {
    await addDoc(collection(db, "Coupon"), {
      name: values.name,
      description: values.description,
      email: user.email ?? user._tokenResponse.email,
      image: imageUrl,
      category: values.category,
      company: values.company,
    });
    openSnackBar("Card added successfully", "Dismiss", "#00A300");
    setImageDescription({
      url: undefined,
    });
    resetForm();
    setUploadLoading(false);
  };

  const uploadToFirebase = async (onProgress: (a: any) => void) => {
    try {
      setUploadLoading(true);
      if (
        values.name === "" ||
        values.description === "" ||
        imageDescription.url === undefined ||
        values.category === "" ||
        values.company === ""
      ) {
        openSnackBar("Please pick an image", "Dismiss", "#B22222");
        setUploadLoading(false);
        return;
      }
      const fetchResponse = await fetch(imageDescription.url);
      const theBlob = await fetchResponse.blob();

      const imageRef = ref(getStorage(), `${values.name}-${new Date()}`);

      const uploadTask = uploadBytesResumable(imageRef, theBlob);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress && onProgress(progress);
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            reject(error);
          },
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              downloadUrl,
              metadata: uploadTask.snapshot.metadata,
            });
          }
        );
      }).then((res: any) => addCard(res.downloadUrl));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Image
        source={
          imageDescription.url
            ? { uri: imageDescription.url }
            : require("./images/noPreview.png")
        }
        style={{ width: "90%", height: 180 }}
        alt="Card Image"
      />

      <Button
        onPress={pickImage}
        variant="outline"
        style={{ height: "6%", width: "70%" }}
        leftIcon={<Icon as={Ionicons} size={6} name="cloud-upload-outline" />}
        onBlur={() => handleBlur("url")}
      >
        Upload an Image
      </Button>

      <View
        style={{
          width: "70%",
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Input
            variant="outline"
            placeholder="Card Name"
            size="lg"
            onChangeText={handleChange("name")}
            value={values.name}
            onBlur={handleBlur("name")}
          />
          {errors.name && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {errors.name}
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextArea
            h={20}
            placeholder="Description"
            maxW="300"
            autoCompleteType=""
            size="lg"
            onChangeText={handleChange("description")}
            value={values.description}
            onBlur={handleBlur("description")}
          />
          {touched?.description && errors.description && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {errors.description}
            </Text>
          )}
        </View>

        <View style={{ marginBottom: 20 }}>
          <Select
            placeholder="Select card category"
            size="lg"
            defaultValue={values.category}
            selectedValue={values.category}
            onValueChange={(value: string) => {
              setFieldValue("category", value);
            }}
          >
            {cardTypes.map((cardType) => (
              <Select.Item
                label={cardType.name}
                value={cardType.name}
                key={cardType.id}
                leftIcon={
                  <Icon
                    as={FontAwesome5}
                    size={6}
                    name={cardType.icon}
                    style={{ width: "10%" }}
                  />
                }
                style={{ borderBottomWidth: 0.3 }}
                onBlur={() => handleBlur("category")}
              />
            ))}
          </Select>
          {touched.category && errors.category && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {errors.category}
            </Text>
          )}
        </View>

        <View style={{ marginBottom: 20 }}>
          <Select
            placeholder="Select card company"
            size="lg"
            onValueChange={(value: string) => {
              setFieldValue("company", value);
            }}
            isDisabled={
              values.category === "" || values.category === "Food"
                ? true
                : false
            }
          >
            {cards.map(
              (cardType) =>
                cardType.type === values.category && (
                  <Select.Item
                    label={cardType.name}
                    value={cardType.name}
                    key={cardType.name}
                    style={{ borderBottomWidth: 0.3 }}
                    onBlur={() => handleBlur("company")}
                  />
                )
            )}
          </Select>
          {touched.company && errors.company && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {errors.company}
            </Text>
          )}
        </View>

        <Button
          // onPress={() => uploadToFirebase((a) => {})}
          onPress={handleSubmit as (e?: GestureResponderEvent) => void}
          disabled={uploadLoading}
          opacity={uploadLoading ? 0.5 : 1}
          style={{ marginBottom: 20, height: "10%" }}
        >
          {uploadLoading ? (
            <Spinner accessibilityLabel="Loading posts" color="white" />
          ) : (
            "Save"
          )}
        </Button>
        <Button
          colorScheme="violet"
          onPress={() => navigation.replace("Home")}
          style={{ height: "10%" }}
        >
          Back
        </Button>
      </View>
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({});
