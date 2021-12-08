import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';
import { Box, Grid, Heading, Link, Flex, Text } from '@chakra-ui/react';
import Card from '@/components/Card';
import Searchbar from '@/components/Searchbar';

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data, isLoading, error } = useQuery(['github', username], () =>
    fetchGithubData(username)
  );

  async function fetchGithubData(username: string) {
    if (username) {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            per_page: 5,
            sort: 'created:asc',
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      );

      return data;
    }
  }

  return (
    <Box py={0} px={8}>
      <Head>
        <title>Github Repo Searcher</title>
        <meta name="description" content="Search github repositories by user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        as="main"
        minH="100vh"
        py={16}
        px={0}
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1" m={0} lineHeight="1.15" size="4xl" textAlign="center">
          <Link href="https://github.com/" color="teal.400" isExternal>
            Github
          </Link>{' '}
          Repo Searcher
        </Heading>

        <Text
          my={16}
          mx={0}
          lineHeight="1.5"
          fontSize="1.5rem"
          textAlign="center"
        >
          Search github repositories by user
        </Text>

        <Searchbar
          {...{
            setUsername,
            searchTerm,
            setSearchTerm,
          }}
        />

        <Grid
          templateColumns={{ md: 'repeat(2, 1fr)' }}
          templateRows={{ base: '1fr' }}
          alignItems="center"
          justifyContent="center"
          gap={4}
          maxW="800px"
        >
          {error && <Text>Error Occured</Text>}
          {isLoading && <Text>Loading...</Text>}
          {data &&
            data?.map((item: any) => <Card key={item.id} {...{ item }} />)}
        </Grid>
      </Flex>

      <ReactQueryDevtools />
    </Box>
  );
};

export default Home;
