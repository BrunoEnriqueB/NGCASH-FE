import './Transfers.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../context/api';
import ApiTypeError from '../../@types/ApiTypeError';
import Transactions from '../../@types/Transactions';

function Transfers() {
  const { getTransactions } = useContext(ApiContext);
  const [transaction, setTransactions] = useState({} as Transactions);
  const [date, setDate] = useState('');
  const [type, setType] = useState(1);
  const [order, setOrder] = useState('' as 'asc' | 'desc');

  function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
    setDate(e.currentTarget.value);
  }

  async function sendTransactiosnRequest(
    date: string,
    order: 'asc' | 'desc',
    type: number
  ) {
    getTransactions({
      filterDate: !!date ? date : '',
      filterOrder: order,
      filterType: type,
    })
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const { data } = err.response!;

          if (data instanceof Array<ApiTypeError>) {
            window.alert(data[0].error);
          }
          if (data.message) {
            window.alert(data.message);
          }
        }
      });
  }

  useEffect(() => {
    sendTransactiosnRequest(date, order, type);
  }, [date, order, type]);
  return (
    <div className='transfers'>
      <h1>Transfers</h1>
      <div className='transfers-filters'>
        <select
          onChange={(e) => {
            setType(Number(e.target.value));
          }}
          name='transfers'
        >
          <option value='1'>Sent and received</option>
          <option value='2'>Sent</option>
          <option value='3'>Received</option>
        </select>
        <div>
          <span>Order by: </span>
          <div className='transfers-filters-filter'>
            <label htmlFor='asc'>Older</label>
            <input
              onClick={() => {
                setOrder('asc');
              }}
              type='radio'
              name='order'
            />
          </div>
          <div className='transfers-filters-filter'>
            <label htmlFor='desc'>Newer</label>
            <input
              onClick={() => {
                setOrder('desc');
              }}
              type='radio'
              name='order'
            />
          </div>
          <div className='transfers-filters-filter'>
            <label htmlFor='data'>Date: </label>
            <input
              onChange={handleDate}
              type='date'
              name='data'
              min='2022-11-01'
              placeholder='yyyy-mm-dd'
            />
          </div>
        </div>
      </div>
      <div className='transfers-sent'>
        <table className='transfers-sent-table' cellSpacing='20'>
          <thead>
            <tr>
              <th>Sent to</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {transaction.sentTransaction &&
              transaction.sentTransaction.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td key={index}>{transaction.creditedAccountUsername}</td>
                    <td>{`R$ ${transaction.value.toFixed(2)}`}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className='transfers-received'>
        <table className='transfers-received-table' cellSpacing='20'>
          <thead>
            <tr>
              <th>Received from</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {transaction.receivedTransaction &&
              transaction.receivedTransaction.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td key={index}>{transaction.debitedAccountUsername}</td>
                    <td>{`R$ ${transaction.value.toFixed(2)}`}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transfers;
