import './admin.scss'
import App from './table';
import DonutChart from './chart';
import { IoEyeSharp ,IoTrendingDownOutline  } from "react-icons/io5";
import { MdOutlineShowChart } from "react-icons/md";
import { FaShoppingBag ,FaUserFriends , FaCartPlus} from "react-icons/fa";
function Admin() {

  return (
    <>
      <h1 style={{fontSize:'30px'}} >Dashboard</h1>
      <div className='farme'>
        <div className="farme_Dashboard">
            <div className="farme_Dashboard-head">
                <div className="farme_Dashboard-head-ion"><IoEyeSharp style={{fontSize:'25px'}} /></div>
                <div className="farme_Dashboard-head-chart"><MdOutlineShowChart style={{fontSize:'30px'}} /></div>
            </div>
            <div className="farme_Dashboard-body">
              <p className="farme_Dashboard-body-text">Total View</p>
              <p className="farme_Dashboard-body-view">308.402</p>
            </div>
            <div className="farme_Dashboard-footer">
              start from 1 jan 2002
            </div>
        </div>
        
        <div className="farme_Dashboard">
            <div className="farme_Dashboard-head">
                <div className="farme_Dashboard-head-ion"><FaShoppingBag style={{fontSize:'25px'}} /></div>
                <div className="farme_Dashboard-head-chart"><IoTrendingDownOutline style={{fontSize:'30px'}} /></div>
            </div>
            <div className="farme_Dashboard-body">
              <p className="farme_Dashboard-body-text">Total product</p>
              <p className="farme_Dashboard-body-view">308.402</p>
            </div>
            <div className="farme_Dashboard-footer">
              start from 1 jan 2002
            </div>
        </div>

        <div className="farme_Dashboard">
            <div className="farme_Dashboard-head">
                <div className="farme_Dashboard-head-ion"><FaUserFriends style={{fontSize:'25px'}} /></div>
                <div className="farme_Dashboard-head-chart"><IoTrendingDownOutline style={{fontSize:'30px'}}/></div>
            </div>
            <div className="farme_Dashboard-body">
              <p className="farme_Dashboard-body-text">Total user</p>
              <p className="farme_Dashboard-body-view">308.402</p>
            </div>
            <div className="farme_Dashboard-footer">
              start from 1 jan 2002
            </div>
        </div>

        <div className="farme_Dashboard">
            <div className="farme_Dashboard-head">
                <div className="farme_Dashboard-head-ion"><FaCartPlus style={{fontSize:'25px'}} /></div>
                <div className="farme_Dashboard-head-chart"><IoTrendingDownOutline style={{fontSize:'30px'}}/></div>
            </div>
            <div className="farme_Dashboard-body">
              <p className="farme_Dashboard-body-text">Total sell</p>
              <p className="farme_Dashboard-body-view">308.402</p>
            </div>
            <div className="farme_Dashboard-footer">
              start from 1 jan 2002
            </div>
        </div>
      </div>

      
      <div className="table-chart">
        <div style={{width:'70%'}}>
          <App/>
        </div>

        <div>
          <DonutChart/>
        </div>
      </div>
    </>
  );
}

export default Admin;
