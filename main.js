var m_eng_toggle = true;
var m_kor_toggle = false;

function toggle_lang() {
  if (m_eng_toggle == true) {
    $("#right").removeClass("mobileInvisible");
    $("#left").addClass("mobileInvisible");
    m_eng_toggle = !m_eng_toggle;
    m_kor_toggle = !m_kor_toggle;
  } else {
    $("#left").removeClass("mobileInvisible");
    $("#right").addClass("mobileInvisible");
    m_eng_toggle = !m_eng_toggle;
    m_kor_toggle = !m_kor_toggle;
  }
}
