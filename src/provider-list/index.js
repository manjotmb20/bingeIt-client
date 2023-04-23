import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWatchProviders } from "../store";
import "./index.css";

const ProviderPage = () => {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.bingeit.providers);
  useEffect(() => {
    dispatch(getWatchProviders());
  }, []);

  return (
    <div>
        {providers.map((provider) => (
          <div key={provider.id}>
            <h2 className="provider-name">{provider.english_name}</h2>
          </div>
        ))}
    </div>
  );
};

export default ProviderPage;
