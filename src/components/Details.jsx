import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../fetch/fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useContext, useState } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">loading...</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div className="details-section">
        <img src={pet.images[0]} alt={pet.name} />
        <div>
          <h1>{pet.name}</h1>
          <h2>{`${pet.animal} | ${pet.breed} | ${pet.city}, ${pet.state}`}</h2>
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <h2>Would you like to adopt {pet.name}?</h2>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
      <Carousel images={pet.images} />
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default Details;
