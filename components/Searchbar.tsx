import { Dispatch, FC, SetStateAction } from 'react';
import { FormControl, Input, FormErrorMessage, Button } from '@chakra-ui/react';

type Props = {
  setUsername: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const Searchbar: FC<Props> = ({ setUsername, searchTerm, setSearchTerm }) => {
  return (
    <FormControl
      maxW="800px"
      mb={16}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Input
        id="username"
        placeholder="Search by Username"
        borderTopRightRadius="0"
        borderBottomRightRadius="0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FormErrorMessage>Error occured.</FormErrorMessage>
      <Button
        colorScheme="teal"
        type="submit"
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        onClick={() => setUsername(searchTerm)}
      >
        Search
      </Button>
    </FormControl>
  );
};

export default Searchbar;
