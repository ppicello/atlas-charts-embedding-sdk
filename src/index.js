import ChartsEmbedSDK, {
  getRealmUserToken,
} from "@mongodb-js/charts-embed-dom";
import * as Realm from "realm-web";
import $ from "jquery";


async function renderChart() {
  const client = new Realm.App({
    id:'app_services_id', // Optional: ~REPLACE~ with your Realm App ID
  }); 

  const credentials = Realm.Credentials.emailPassword("user_email_1", "user_email_1");
  await client.logIn(credentials);


  const sdk = new ChartsEmbedSDK({
    baseUrl: "charts_url", // Optional: ~REPLACE~ with your Charts URL
    getUserToken: () => getRealmUserToken(client),
  });

  const chart = sdk.createChart({
    chartId: "chart_id"
  });
  chart.render(document.getElementById("chart"));

  $("#refresh").on("click", () => {
    chart.refresh();
  });
  $("#purchasemethod-filter").on("change", e => {
    const purchaseMethod = e.target.value;
    purchaseMethod
      ? chart.setFilter({ "purchaseMethod": purchaseMethod })
      : chart.setFilter({});
  });
}

renderChart().catch(e => window.alert(e.message));
