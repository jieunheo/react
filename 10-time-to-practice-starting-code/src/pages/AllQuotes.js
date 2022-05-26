import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  { id: 'q1', author: 'hong', text: 'Learning React!' },
  { id: 'q2', author: 'heo', text: 'Learning Javascript!' }
];

const AllQuotes = () => {
  return (
      <QuoteList quotes={DUMMY_QUOTES} />
  );
};

export default AllQuotes;