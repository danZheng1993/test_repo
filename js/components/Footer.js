import React from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';

export default ({ onAdd, onDeposit, onWithdraw, onExchange }) => (
  <Footer>
    {onAdd &&
      <FooterTab>
        <Button onPress={onAdd}>
          <Icon name="add" />
        </Button>
      </FooterTab>
    }
    {onDeposit &&
      <FooterTab>
        <Button onPress={onDeposit}>
          <Icon name="arrow-round-up" />
        </Button>
      </FooterTab>
    }
    {onWithdraw &&
      <FooterTab>
        <Button onPress={onWithdraw}>
          <Icon name="arrow-round-down" />
        </Button>
      </FooterTab>
    }
    {onExchange &&
      <FooterTab>
        <Button onPress={onExchange}>
          <Icon name="swap" />
        </Button>
      </FooterTab>
    }
  </Footer>
)