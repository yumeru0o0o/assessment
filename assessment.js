"use strict"; /**厳格モード */
const userNameInput = document.getElementById("user-name"); //userNameInput~tweetDividedには、htmlの各ID属性の付いた情報が取得され、代入される。
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");


/**
 * 指定した子ども要素をすべて削除する
 * @param {HTMLElement} element HTMLの要素(Ex.tweetDivided,resultDivided
 */
function removeAllChildren(element) {
    while (element.firstChild) { //子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}


assessmentButton.onclick = function() { //assessment.onclickに関数が設定されている。この関数を「無名関数」と言う。
//assessmentbutton.onclick = () => {　(略 でも可。 
    const userName = userNameInput.value;
    if (userName.length === 0) { //名前の長さが0=空白の場合は何もしない
        return;
    } //このようなif文を「ガード句」という。

    console.log(userName);

    //TODO 診断結果表示エリアの作成
    removeAllChildren(resultDivided); //最初に前回のresultDividedを削除

    const header = document.createElement("h3"); //createElementは「要素の作成」。見出し要素の[h3]を作成し変数[header]に代入
    header.innerText = "診断結果"; //innerTextは「内側のテキスト」。"診断結果"を[header]に挿入する
    resultDivided.appendChild(header); //appendChildは「子を追加する」。div要素を親として、[header]を子として追加する。

    const paragraph = document.createElement("p"); //[p]は段落要素
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided); //tweetDividedの子要素全削除
    const anchor = document.createElement("a"); //aタグを作成
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag="
    + encodeURIComponent("あなたのいいところ")
    + "&ref_src=twsrc%5Etfw" //URLを再代入不可の[const]代入,+で3つの文を結合

    anchor.setAttribute("href",hrefValue); //href属性
    anchor.className = "twitter-hashtag-button"; //className属性
    anchor.setAttribute("data-text",result); //data-text属性
    anchor.innerText = "Tweet #あなたのいいところ";

    tweetDivided.appendChild(anchor); //tweetdividedにanvhorを子要素として追加

    //widgets.jsの設定
    const script = document.createElement("script");
    script.setAttribute("src","https://platform.twitter.com/widgets.js");
    tweetDivided.appendChild(script);
};

//名前の入力後にEnterでも診断結果を出力させる
userNameInput.onkeydown = (event) => {
    if (event.key === "Enter") {
        //TODO ボタンのonclick() 処理を呼び出す
        assessmentButton.onclick();
    };
};


const answers = [
    "{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。",
    "{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。",
    "{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。",
    "{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。",
    "{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。",
    "{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。",
    "{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。",
    "{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。",
    "{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。",
    "{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。",
    "{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。",
    "{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。",
    "{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。",
    "{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。",
    "{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。",
    "{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。"
];


/**
 * この部分はコメントアウト
 * 名前の文字列を渡すと診断結果を返す関数
 * @param (string) userName ユーザーの名前
 * @return (string) 診断結果
 */
function assessment(userName) {
    //TODO 診断結果を実装する
    //全文字コード番号を取得してそれらを足し合わせる
    let sumOfCharCode = 0; //コード番号を代入する変数の初期化、letはforやifなどの{}で囲まれた中での利用に限ることができるので、varより安全。
    for (let i = 0; i < userName.length; i++) { //ユーザーの名前の文字数分forを回す。
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i); //回すたびにコード番号の合計に足していく。
    } 

    //文字のコード番号の合計を回答の数で割って添え字の数字を決める。
    const index = sumOfCharCode % answers.length; //再代入不可のconstに合計/answerの余りを代入
    let result = answers[index]; //indexを添え字としてanswersに代入

    //TODO {userName} をユーザーの名前に置き換える
    result = result.replace(/\{userName\}/g,userName); 
    //正規表現による文字の置き換え。[/\{userName\}/g]が正規表現。この記述では{userName}という文字列自身に合うものを複数回適用するという意味。
    //resultに対して、{userName}の部分を再代入しているので、変数宣言には[let]を使う。
    return result;
}
