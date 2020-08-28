//認証用インスタンスの生成
var twitter = TwitterWebService.getInstance(
  '0NheamHGbK6d4y84V1hLqesYy',//Twitter API Key
  'LBfBUrNBtDB4xV4Z5qNtuIDPa7IDj3q6pYaTOnt9Q6S0O5CqRE'//Twitter API secret key
);

//アプリを連携認証する
function authorize() {
  twitter.authorize();
}

//認証を解除する
function reset() {
  twitter.reset();
}

//認証後のコールバック
function authCallback(request) {
  return twitter.authCallback(request);
}

//Twitterに投稿するメッセージを作成する
function CreatePostMessage() {
  //シートと今日の測定値が入力された行番号を取得する
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  var lastRow = sheet.getRange(sheet.getMaxRows(), 3).getNextDataCell(SpreadsheetApp.Direction.UP).getRow();

  //各測定項目の値を取得
  var weight = sheet.getRange(lastRow, 3).getValue();
  var bmi = sheet.getRange(lastRow, 4).getValue();
  var fatPercentage = sheet.getRange(lastRow, 5).getValue();
  var visceralFatLevel = sheet.getRange(lastRow, 6).getValue();
  //ツイートのフォーマット
  var postMessage = '本日の測定結果は\n\n体重：' + weight + 'kg\nBMI：' + bmi + '\n体脂肪率：' + fatPercentage + '%\n内臓脂肪レベル：' + visceralFatLevel + '\n\nでした。';

  return postMessage;
}  

//ツイートを投稿
function postTweet() {
  
  var postMessage = CreatePostMessage();
  
  var service  = twitter.getService();
  var endPointUrl = 'https://api.twitter.com/1.1/statuses/update.json';
  var response = service.fetch(endPointUrl, {
    method: 'post',
    payload: {
      status: postMessage
    }
  });
}