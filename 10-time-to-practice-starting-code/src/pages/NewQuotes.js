import QuoteForm from '../components/quotes/QuoteForm';

const NewQuotes = () => {
  const addQuoteHandler = quoteData => {
    const author = quoteData.author;
    const text = quoteData.text;


  };

  return (
    <QuoteForm onAddQuote={addQuoteHandler} />
  );
};

export default NewQuotes;