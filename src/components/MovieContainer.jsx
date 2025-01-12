import Card from "./Card";
import React, { useEffect, useRef } from "react";


function MovieContainer(props) {
    const cardContainerRef = useRef(null);
    

      useEffect(() => {
        const cardContainer = cardContainerRef.current;

        if (cardContainer) {
            if (props.scroll) {
                console.log(props.scroll);
                // Start scrolling animation
                const duration = cardContainer.style.animationDuration || "1s"; // Fallback to default duration
                cardContainer.style.animation = `scrollCards  linear infinite`;
                if (cardContainer) {
                    // Get the total number of cards
                    const totalCards = cardContainer.children.length;
              
                    // Calculate animation duration (e.g., 0.1s per card, minimum 1s)
                    const duration = Math.min(.05* totalCards, 1);
              
                    // Dynamically update the animation duration in the card container
                    cardContainer.style.animationDuration = `${duration}s`;
                  }
                cardContainer.style.transform = ""; // Clear inline transform
            } else {
                console.log(props.scroll);

                // Stop scrolling and freeze at the current position
                const computedStyle = window.getComputedStyle(cardContainer);
                const currentTransform = computedStyle.transform; // Get current position
                cardContainer.style.animation = "none"; // Stop the animation
                cardContainer.style.transform = currentTransform; // Freeze the position
            }
        }
    }, [props.scroll]); // Re-run this effect when `scroll` changes

  const cards = [
    { image: "https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg", name: "Joker" },
    { image: "https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg", name: "Joker" },

    { image: "https://images-cdn.ubuy.co.in/668f03f763dc6918441092c0-avengers-infinity-war-movie-poster.jpg", name: "Avengers" },
    { image: "https://images-cdn.ubuy.co.in/668f03f763dc6918441092c0-avengers-infinity-war-movie-poster.jpg", name: "Avengers" },

  ];

  // Duplicate cards to create an infinite loop effect
  const duplicatedCards = [...cards, ...cards, ...cards];

  return (
    <>
      <div className={`movieframe ${props.fog ? "hasfog":"" }`}>
        <div className={`cardcontainer ${props.scroll ? "scrolling" : ""}`}  ref={cardContainerRef}>
          {duplicatedCards.map((card, index) => (
            <Card key={index} image={card.image} name={card.name} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieContainer;
