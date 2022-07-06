import moment from "moment"

export default function formatElapsedTime(date : Date){
        var now = moment()
        var from = moment(date)
      
        var yearDiff = now.diff(from, "years")
        var monthDiff = now.diff(from, "months")
      
        var fmt = yearDiff + " ans"
      
        if ((monthDiff % 12) > 0)
          fmt += " et " + (monthDiff % 12) + " mois"
      
        return fmt
}