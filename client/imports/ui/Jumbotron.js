
import React from 'react'

const styles = {
  textAlign: 'center',
  marginBottom: '3%',
}

const styles2 = {
  fontSize: '8em',
}

export default () => (
  <div className="jumbotron full" >
    <div className="container" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      padding: '30px',
      borderRadius: '15px 50px',
      marginBottom: '4%',
    }}>
      <div className="col-lg-4" >
        <div style={styles}><i className="fa fa-cubes" style={styles2} aria-hidden="true"></i></div>
        <h2>On blockchain</h2>
        <p>Etherlife.co is based on the blochain technology. Your tokens are
          safe by a world computer. This computer assure an access permanent and
          an maximum security of your ether chest.
        </p>
      </div>
      <div className="col-lg-4" >
        <div style={styles}><i className="fa fa-key" style={styles2} aria-hidden="true"></i></div>
        <h2>Lock for life</h2>
        <p>The database is the blockchain. </p>
      </div>
      <div className="col-lg-4" >
        <div style={styles}><i className="fa fa-globe" style={styles2} aria-hidden="true"></i></div>
        <h2>Free &amp; open</h2>
        <p >Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
      </div>
    </div>
    <p style={{ textAlign: 'center' }}>
      <a className="btn btn-primary btn-lg" href="#" role="button">
        <i className="fa fa-rocket" aria-hidden="true"></i>
        Create your legacy contract
      </a>
    </p>
  </div>
)
