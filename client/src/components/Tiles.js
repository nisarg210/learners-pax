import React from 'react'
import { useHistory } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

function Tiles(props) {
    const history = useHistory();
    const changeAddress = (name) => {
      history.push(`/${name}`);
    };
    const { iconName, addName,title}= props;
    return (
        <>
            <Card
              centered
              fluid
              raised
              color="yellow"
              name={addName}
              onClick={(event, data) => {
                changeAddress(data.name);
                console.log(data.name);
              }}
            >
              <Card.Content>
                <center>
                  <Icon
                    className="icon-display"
                    name={iconName}
                    size="massive"
                    color="yellow"
                  />
                  <Card.Header as="h2">{title}</Card.Header>

                  <Card.Description>
                    See all new updates given by teacher.
                  </Card.Description>
                </center>
              </Card.Content>
            </Card>
        </>
    )
}

export default Tiles
