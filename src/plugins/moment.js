import moment from "moment";
export default function(app, inject) {
  moment.locale("ru");
  inject("moment", moment);
}
