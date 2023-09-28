import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "bootstrap/dist/css/bootstrap.min.css";

function JustifiedExample() {
  return (
    
    <Tabs
      defaultActiveKey="P2PPayments"
      id="justify-tab-example"
      transition={false}
      animation={false}
      className="mb-3 bg-info text-danger"
      justify
      style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}
    >
      <Tab eventKey="P2PPayments" title="P2PPayments" />

      <Tab eventKey="P2PLoans" title="P2PLoans" className='bg-danger'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="ROROLoans" title="ROROLoans" className='bg-danger'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="P2RSurplus" title="P2RSurplus" className='bg-danger'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="Payments" title="Payments" className='bg-danger'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="R2CSurplus" title="R2CSurplus" className='bg-danger'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="ReceiptFromRO" title="ReceiptFromRO" className='bg-danger'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="COLevies" title="COLevies" className='bg-danger'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="AssetsFunds" title="AssetsFunds" className='bg-danger'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="TermLoanSetoff" title="TermLoanSetoff" className='bg-danger'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="Reserves" title="Reserves"style={{borderBottomRightRadius:10 }} className='bg-info'>
        Tab content for Loooonger Tab
      </Tab>

    </Tabs>
  );
}

export default JustifiedExample;
