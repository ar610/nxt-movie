import Card from "./Card";
import  { useEffect, useRef, useState } from "react";
import Lottie from "lottie-web"; // Import Lottie library
import animationData from "../assets/Animation - 1736710763838.json";

import { useUserAuth } from "../context/UserAuthContext";
import { getUserMovies } from '../utils/firebase-movie';

import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

function MovieContainer(props) {

  const { user } = useUserAuth();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;
    const userDocRef = doc(db, 'users', user.uid);
    // Set up real-time listener
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setCards(userData.movies || []);
      } else {
        setCards([]);
      }
    }, (error) => {
      console.error("Error fetching movies:", error);
    });
    return () => unsubscribe();
  }, [user]);

  const cardContainerRef = useRef(null);

  const [selectedCard, setSelectedCard] = useState(null); // State to store selected card

  const lottieRef = useRef(null);

  //TO SHOW THE LOADING ANIMATION
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


  //to make the cards scroll
  useEffect(() => {
    const cardContainer = cardContainerRef.current;

    if (cardContainer) {
      if (props.scroll) {

        cardContainer.style.animation = `scrollCards linear infinite`;

        if (cardContainer) {

          const totalCards = cardContainer.children.length;

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
/*
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
      name: "Avengers adsfjaskfjadskfj;alskfj;adslkfj;ksadfl",
    },
    {
      image:
        "https://images-cdn.ubuy.co.in/668f03f763dc6918441092c0-avengers-infinity-war-movie-poster.jpg",
      name: "Avengers dfadsfdsggdfgdsgfsdgsdgfsdgdfsgd",
    },
  ];
  */

  // Duplicate cards to create an infinite loop effect
  const duplicatedCards = [...cards, ...cards, ...cards,...cards, ...cards, ...cards];

  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setSelectedCard(cards[randomIndex]);
  };

  // Call the selectRandomCard function when the component mounts or on button click
  useEffect(() => {
    selectRandomCard(); 
  }, [props.scroll]); 

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
        <div id="selected-card" className={`selected ${props.selected ? "display" : ""} `}>
          <Card
          image={selectedCard ? selectedCard.image : ""}
          name=""
          />
        </div>
      </div>
    </>
  );
}

export default MovieContainer;
