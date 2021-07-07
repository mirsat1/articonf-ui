import React, { useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { Button, Message, Icon } from "semantic-ui-react";
import NotProvider from "../components/NotProvider";

function Deploy() {
  const { role } = useContext(Context);
  const UCProvider = RegExp("UCprovider").test(role);
  return !UCProvider ? (
    <NotProvider />
  ) : (
    <div className="theBody">
      <h1 title="deployPage">Please consider the following: </h1>
      <br />
      <Message icon>
        <Icon name="info" />
        <p data-testid="paragraphInDeploy">
          Please consider that this GUI is still in early development and there
          might be some flaws, bugs and erros. So please, if you encounter any
          bug report it trough the "Contact Us" button above in the navigation
          bar. Also the ARTICONF toolset is in early development, so currently,
          the environment has some limitations.
        </p>
      </Message>
      <Message
        warning
        icon="warning"
        header="While using this demo, please DO NOT leave or refresh this UI"
        content="Because you will lose the progress you made so far. Thank you in
        advance"
      />
      <Message info>
        <Message.Header>
          You have two options of using our platform
        </Message.Header>
        <ol>
          <li>
            <strong>Deploy your application with blockchain.</strong> <br />
            In order to deploy your application with blockchain, you first need
            to deploy TIC by clicking the 'Deploy TIC' button, and follow the
            instructions presented there. And then deploy your application by
            clicking the 'Deploy application' button bellow and follow the
            instructions there. This will deploy your application with
            blockchain
          </li>
          <li>
            <strong>Deploy your application without blockchain.</strong>
            <br /> In order to deploy your application without blockchain you
            only need to click the 'Deploy application' button bellow and follow
            the instructions there. This will only deploy your application
            without blockchain.
          </li>
        </ol>
      </Message>
      <Button
        as={Link}
        to="/beta/testing/deploy/deployment"
        data-testid="deployBtnDeployPg"
      >
        Deploy TIC
      </Button>
      <Button as={Link} to="/beta/testing/deploy/app">
        Deploy Application
      </Button>
    </div>
  );
}

export default Deploy;
