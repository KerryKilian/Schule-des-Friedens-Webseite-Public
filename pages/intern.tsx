import { storage } from "../firebase";
import Input from "../src/frontend/components/Input";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import React from "react";
import { useState, ChangeEvent } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { ValidationErrors } from "../src/Resources";

export default function Intern() {
  const [errors, setErrors] = useState<ValidationErrors>();
  const [progress, setProgress] = useState(0);
  const [news, setNews] = useState<{
    title: string;
    subtitle: string;
    text: string;
    authorName: string;
    images: string[];
  }>({
    title: "",
    subtitle: "",
    text: "",
    authorName: "",
    images: [],
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setNews((prevNews) => ({
      ...prevNews,
      [id]: value,
    }));
    console.log(news);
  };

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
      });
      const result = await response.json();
      console.log(result);
      console.log(response.ok);
      if (response.ok) {
        setSuccessMessage("Artikel erfolgreich hinzugefügt");
      } else {
        setSuccessMessage("Ein Fehler ist aufgetreten");
        setErrors(result);
      }
    } catch (error) {
      console.error("Ein Fehler ist aufgetreten: ", error);
    }
  }

  /**
   * when user is chosing an image, the image immediatly gets uploaded and the url is saved in the news object
   * @param e
   * @returns
   */
  const handleImageChange = (e: any) => {
    console.log(e.target?.files);
    const files = e.target?.files;

    Array.from(files).forEach((file: any) => {
      if (!file) return;
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("on state changed");
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNews((prevNews) => ({
              ...prevNews,
              images: [...prevNews.images, downloadURL],
            }));
          });
        }
      );
    });
  };

  return (
    <>
      <h2>News hinzufügen</h2>
      <form className="form" onSubmit={send}></form>
      <form action="" className="form" onSubmit={send}>
        <Input
          id="title"
          label="Titel"
          onChange={handleInputChange}
          type="text"
          value={news.title}
          placeholder="Titel"
          inputClassName="question__input question__inputlong"
          labelClassName="question__label"
        ></Input>
        <Input
          id="subtitle"
          label="Untertitel"
          onChange={handleInputChange}
          type="text"
          value={news.subtitle}
          placeholder="Untertitel"
          inputClassName="question__input question__inputlong"
          labelClassName="question__label"
        ></Input>
        <Input
          id="authorName"
          label="Autor"
          onChange={handleInputChange}
          type="text"
          value={news.authorName}
          placeholder="Name Autor/in"
          inputClassName="question__input question__inputlong"
          labelClassName="question__label"
        ></Input>
        <Input
          id="text"
          label="Artikel"
          onChange={handleInputChange}
          type="textarea"
          value={news.text}
          placeholder="Schreibe hier deinen Artikel hinein"
          inputClassName="question__input question__inputlong"
          labelClassName="question__label"
          textarea={true}
          rows={15}
        ></Input>

        <label
          htmlFor="file1"
          className="fileinput__label question__button hoveranimationsmall"
        >
          Bilder hinzufügen
        </label>
        <input
          id="file1"
          type="file"
          className="fileinput"
          onChange={handleImageChange}
          multiple
        />
        {progress != 0 && progress != 100 && (
          <Progress
            percent={progress}
            status="active"
            theme={{
              active: {
                symbol: "",
                color: "#202c64",
              },
              default: {
                symbol: "",
                color: "#fbc630",
              },
            }}
          />
        )}
        <div className="fileinput__container">
          {news.images &&
            news.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt=""
                width={400}
                height={400}
                className="rounded fileinput__img"
              />
            ))}
        </div>

        <input
          type="submit"
          className="question__button accept hoveranimationbig"
        />
        <br />
        <small>{successMessage}</small>
        {errors?.errors.map((error) => (
          <>
            <br />
            <small>{error.msg}</small>
          </>
        ))}
      </form>
      <button onClick={(e) => console.log(news)}>Klick mihc</button>
    </>
  );
}
