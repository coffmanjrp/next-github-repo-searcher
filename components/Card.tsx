import { FC } from 'react';
import { Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type Props = {
  item: {
    name: string;
    url: string;
    owner: {
      login: string;
    };
  };
};

const Card: FC<Props> = ({ item }) => {
  return (
    <Link
      href={item.url}
      p={6}
      textAlign="left"
      color="inherit"
      textDecoration="none"
      border="1px"
      borderStyle="solid"
      borderColor="gray.300"
      borderRadius="10px"
      transition="color 0.15s ease, border-color 0.15s ease"
      isExternal
    >
      <Text as="h2" fontSize="1.5rem" mb={4}>
        {item.name} <ExternalLinkIcon mx="2px" />
      </Text>
      <Text h="1em" ml={2}>
        {item.owner.login}
      </Text>
    </Link>
  );
};

export default Card;
