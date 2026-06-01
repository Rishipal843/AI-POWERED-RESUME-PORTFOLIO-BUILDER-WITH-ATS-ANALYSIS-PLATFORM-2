import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Portfolioregistry } from "./Portfolioregistry";
import user_context from "../../../UseContext";

const Portfoliorenderer = () => {

  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const {setportslug} = useContext(user_context)

  setportslug(slug)

  useEffect(() => {

    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/portfolio/${slug}`);
        setPortfolio(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPortfolio();

  }, [slug]);

  if (!portfolio) return <h2>Loading...</h2>;

  const TemplateComponent = Portfolioregistry[portfolio.template];

  return (
    <>
      {TemplateComponent ? (
        <TemplateComponent data={portfolio} />
      ) : (
        <h2>Template not found</h2>
      )}
    </>
  );
};

export default Portfoliorenderer;