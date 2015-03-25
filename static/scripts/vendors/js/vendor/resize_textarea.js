<script type="text/javascript">
var resizeTextarea = function() {
    this.style.height = "";

    var
        $this = $(this),            
        outerHeight = $this.outerHeight(),
        scrollHeight = this.scrollHeight,
        innerHeight = $this.innerHeight(),
        magic = outerHeight - innerHeight;
    this.style.height = scrollHeight + magic + "px";
};
$('textarea')
    .keydown(resizeTextarea)
    .keyup(resizeTextarea)
    .change(resizeTextarea)
    .focus(resizeTextarea);
</script>