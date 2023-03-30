import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const router = useRouter();

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const callOpenAIEndpoints = (input) => {
    if (input < 2) {
      return;
    }
    //navigate to results page
    router.push({
      pathname: "/results",
      query: { question: input },
    });
    //callAnswerQuestion(input);
  };

  const GenerateButton = ({ title }) => (
    <div className="prompt-buttons">
      <a
        className="generate-button"
        onClick={() => callOpenAIEndpoints(userInput)}
      >
        <div className="generate">
          <p>{title}</p>
        </div>
      </a>
    </div>
  );

  return (
    <div className="root">
      <Head>
        <title>Val GPT</title>
      </Head>
      <div className="container vertical-center">
        <div className="header">
          <div className="header-title">
            <h1>Ask any question about Valorant</h1>
          </div>
          <br></br>

          <div className="form-group ml-auto mr-auto">
            <textarea
              placeholder="Enter your question here! Ex. How do I play Sage?"
              className="prompt-box"
              value={userInput}
              onChange={onUserChangedText}
            />

            <GenerateButton title="Generate" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
