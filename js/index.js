$(document).ready(function () {
	$("input[name='start']").val(parseInt(getParam("start")) || 10);
	$("input[name='end']").val(parseInt(getParam("end")) || 20);
	$("input[name='timeout']").val(parseFloat(getParam("timeout")) || 6);
});