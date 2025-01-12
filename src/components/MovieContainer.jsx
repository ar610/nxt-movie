import Card from "./Card";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-web"; // Import Lottie library
import animationData from "../assets/Animation - 1736710763838.json";

function MovieContainer(props) {
  const cardContainerRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null); // State to store selected card

  const lottieRef = useRef(null);
  console.log(props.loading);

  useEffect(() => {
    if (props.loading) {
      if (!lottieRef.current) {
        return; // Prevent re-initializing if Lottie is already initialized
      }
      const lottieInstance = Lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });

      return () => {
        lottieInstance.destroy();
      };
    }
  }, [props.loading]); // Only run when `props.loading` changes

  useEffect(() => {
    const cardContainer = cardContainerRef.current;

    if (cardContainer) {
      if (props.scroll) {
        // Start scrolling animation
        const duration = cardContainer.style.animationDuration || "1s"; // Fallback to default duration
        cardContainer.style.animation = `scrollCards linear infinite`;
        if (cardContainer) {
          // Get the total number of cards
          const totalCards = cardContainer.children.length;

          // Calculate animation duration (e.g., 0.1s per card, minimum 1s)
          const duration = Math.min(0.05 * totalCards, 1);

          // Dynamically update the animation duration in the card container
          cardContainer.style.animationDuration = `${duration}s`;
        }
        cardContainer.style.transform = ""; // Clear inline transform
      } else {
        // Stop scrolling and freeze at the current position
        const computedStyle = window.getComputedStyle(cardContainer);
        const currentTransform = computedStyle.transform; // Get current position
        cardContainer.style.animation = "none"; // Stop the animation
        cardContainer.style.transform = currentTransform; // Freeze the position
      }
    }
  }, [props.scroll]); // Re-run this effect when `scroll` changes

  const cards = [
    {
      image:
        "https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg",
      name: "Joker",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg",
      name: "Joker",
    },
    {
      image:
        "https://images-cdn.ubuy.co.in/668f03f763dc6918441092c0-avengers-infinity-war-movie-poster.jpg",
      name: "Avengers",
    },
    {
      image:
        "https://images-cdn.ubuy.co.in/668f03f763dc6918441092c0-avengers-infinity-war-movie-poster.jpg",
      name: "Avengers",
    },
  ];

  // Duplicate cards to create an infinite loop effect
  const duplicatedCards = [...cards, ...cards, ...cards];

  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setSelectedCard(cards[randomIndex]);
  };

  // Call the selectRandomCard function when the component mounts or on button click
  useEffect(() => {
    selectRandomCard(); // Randomly select a card when the component mounts
  }, [props.scroll]); // Empty dependency array means it will run once on mount

  return (
    <>
      <div className={`movieframe ${props.fog ? "hasfog" : ""}`}>
        <div
          className={`cardcontainer ${props.scroll ? "scrolling" : ""}`}
          ref={cardContainerRef}
        >
          {duplicatedCards.map((card, index) => (
            <Card key={index} image={card.image} name={card.name} />
          ))}
        </div>
        {/* Conditionally render the Lottie animation container */}
        <div ref={lottieRef} className="lottie-container"></div>
        <div id="selected-card" className={`selected ${props.selected ? "display" : ""}`}><Card
          image={selectedCard ? selectedCard.image : ""}
          name={selectedCard ? selectedCard.name : ""}
        />
        </div>
      </div>
    </>
  );
}

export default MovieContainer;
