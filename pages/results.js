import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Results = () => {
  const [question, setQuestion] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const router = useRouter();

  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (apiOutput.length > 1) {
      return;
    }
    if (question.length > 1) {
      return;
    }
    if (router.query.question) {
      setQuestion(router.query.question);
      setModel(router.query.model);
    }
  }, []);

  useEffect(() => {
    if (question.length > 1) {
      if (isGenerating) {
        return;
      }
      setIsGenerating(true);
      callAnswerQuestion(question);
    }
  }, [question]);

  const callAnswerQuestion = async (input) => {
    setIsGenerating(true);
    console.log("Calling OpenAI with input...", input);
    const response = await fetch("/api/answerQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input, model }),
    });
    const data = await response.json();

    setApiOutput(`${data.answer}`);
    setIsGenerating(false);
  };

  const Page2 = () => (
    <div className="container">
      {isGenerating ? (
        <div className="vertical-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            {apiOutput ? (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h2>{question}</h2>
                  </div>
                </div>
                <div className="output-content answer-box">
                  <p>{apiOutput}</p>
                </div>
              </div>
            ) : (
              <span className="loader"></span>
            )}
          </div>

          <div className="badge-container grow me-auto">
            <a
              className="generate-button"
              onClick={() => {
                router.back();
              }}
            >
              <div className="generate ">
                <p>Back</p>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="root">
      <Head>
        <title>Val GPT</title>
      </Head>
      <Page2 />
    </div>
  );
};

export default Results;
