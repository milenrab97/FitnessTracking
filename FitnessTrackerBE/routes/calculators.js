const express = require('express')
const axios = require('axios')
const router = express.Router()
const converter = require('xml-js')

const getXmls = ({ age, height, weight }) => `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service">
   <soapenv:Header />
   <soapenv:Body>
      <gs:calculateCaloriesRequest>
         <gs:age>${age}</gs:age>
         <gs:height>${height}</gs:height>
         <gs:weight>${weight}</gs:weight>
      </gs:calculateCaloriesRequest>
   </soapenv:Body>
</soapenv:Envelope>
`

router.post('/calories', async function (req, res) {
    const { age, height, weight } = req.body

    try {
        const xmls = getXmls({ age, height, weight })
        const { data } = await axios.post('http://localhost:8080/ws',
            xmls,
            {
                headers:
                    { 'Content-Type': 'text/xml' }
            })

        const converted = JSON.parse(converter.xml2json(data, { compact: true, spaces: 4 }))
        const calories = Number(converted['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:calculateCaloriesResponse']['ns2:calories']["_text"])

        res.status(200).json({ calories })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error,
        })
    }
})

module.exports = router