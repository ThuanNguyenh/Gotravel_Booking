import { useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';
import BasicCard from './card';

function CheckTour() {

    const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  


    return (
          <>
            <head></head>
            <div style={{width:'1200px', marginLeft:'50%',transform:'translateX(-50%)', paddingTop:'50px', display:'flex' }}>
                <div style={{width:'70%'}} >

                    <h1 style={{marginBottom:'20px' , fontSize:'18px'}}> 
                        Thông tin liên hệ
                    </h1>
                <div style={{backgroundColor:'white' , padding:'10px',borderRadius:'5px'}}>
                <p style={{margin:'20px 0'}}>
                        Thông Tin Liên Hệ (nhận vé/phiếu thanh toán)
                    </p>
                <form >
      <Input
        label="Họ tên"
        placeholder="Nhập họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        clearable
      />
      <Spacer y={1.5} />

        <div style={{display:'flex'}} >

      <Input
        label="Điện thoại di động"
        placeholder="Nhập số điện thoại"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        fullWidth
        clearable
        initialValue="+84"
      />
      <Spacer y={1.5} />
      <Input
        label="Email"
        placeholder="Nhập email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        clearable
      />
        </div>

      <Spacer y={1.5} />
      {/* <Radio.Group
        value={reservationType}
        onChange={setReservationType}
        row
      >
        <Radio value="visitor">Tôi là khách tham quan</Radio>
        <Radio value="other">Tôi đặt cho người khác</Radio>
      </Radio.Group> */}
      <Spacer y={1.5} />
      
                 </form>
                </div>


      <div style={{backgroundColor:'white' , padding:'10px',borderRadius:'5px' , marginTop:'20px'}}>

                <h1>Tóm tắt</h1>

                <div style={{display:"flex" , justifyContent:'space-between' , marginTop:'10px'}} >
                    <p style={{fontSize:'17px'}}>
                        Số lượng
                    </p>
                    <p style={{fontSize:'17px' , color:'red' , fontWeight:'300'}}>
                      X  2
                    </p>
                </div>

                <div style={{display:"flex" , justifyContent:'space-between' , marginTop:'10px'}} >
                    <p style={{fontSize:'17px'}}>
                        Giá Bạn Trả
                    </p>
                    <p style={{fontSize:'17px' , color:'red' , fontWeight:'300'}}>
                        20.000.000 VND
                    </p>
                </div>
                 
                 <div style={{display:'flex', justifyContent:'end'}}>

                <Button style={{marginTop:'18px'}}  >
        Thanh Toán
      </Button>
                 </div>

                </div>

                    
                </div>
                {/* ---------------------------- */}
                <div style={{width:'30%', marginLeft:'5px' }} >
      
      <h3 style={{marginBottom:'12px', marginTop:"13px" , fontSize:'14px'}} >Tóm tắt đặt chỗ</h3>

        <BasicCard/>

                </div>
            </div> 
        </>
     );
}

export default CheckTour;