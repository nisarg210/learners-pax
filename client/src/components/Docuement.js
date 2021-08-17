import React, { useState } from "react";
import { Button, Card, Image, Label, Placeholder, Segment } from "semantic-ui-react";
import "./Docuement.css";
const cards = [
  {
    avatar: "../static/pdf.png",
    date: "Joined in 2013",
    header: "Helen",
    description: "Primary Contact",
  },
  {
    avatar: "/images/avatar/large/matthew.png",
    date: "Joined in 2013",
    header: "Matthew",
    description: "Primary Contact",
  },
  {
    avatar: "/images/avatar/large/molly.png",
    date: "Joined in 2013",
    header: "Molly",
    description: "Primary Contact",
  },
];

function Docuement() {
  const [loading, setloading] = useState(false);

  return (
    <div className="notefound">
      <Card.Group doubling centered itemsPerRow={4} stackable>
        {cards.map((card) => (
            
          <Card key={card.header}>
            <Label as='a' color="black" corner icon="file pdf outline">
             
            </Label>
            {loading ? (
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            ) : (
                <Image src="./zip.jpg" />
            )}

            <Card.Content>
              {loading ? (
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line length="very short" />
                    <Placeholder.Line length="medium" />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              ) : (
                <>
                <Image src="./zip.jpg" />
                  <Card.Header>{card.header}</Card.Header>
                  <Card.Meta>{card.date}</Card.Meta>
                  <Card.Description>{card.description}</Card.Description>
                </>
              )}
            </Card.Content>
          </Card>
         
        ))}
      </Card.Group>
    </div>
  );
}

export default Docuement;
