var AdminModelActions = function(actionErrorMessage, actionConfirmations) {
    // batch actions helpers
    this.execute = function(name) {
        var selected = $('input.action-checkbox:checked').length;

        if (selected === 0) {
            alert(actionErrorMessage);
            return false;
        }

        var msg = actionConfirmations[name];

        if (!!msg)
            if (!confirm(msg))
                return false;

        // Update hidden form and submit it
        var form = $('#action_form');
        // val(value) 把传入的值设置为所有已匹配表单元素的值。
        $('#action', form).val(name);

        // 清空表单的所有数据
        $('input.action-checkbox', form).remove();
        // 获取所有已经选中的 checkbox
        $('input.action-checkbox:checked').each(function() {
            form.append($(this).clone());
        });

        // 提交表单
        form.submit();

        return false;
    };

    $(function() {
        // 注册all checkbox事件
        $('.action-rowtoggle').change(function() {
            $('input.action-checkbox').prop('checked', this.checked);
        });
    });

    $(function() {
        var inputs = $('input.action-checkbox');
        // 注册row checkbox事件
        inputs.change(function() {
            var allInputsChecked = true;
            for (var i = 0; i < inputs.length; i++) {
                if (!inputs[i].checked) {
                    allInputsChecked = false;
                    break;
                }
            }
            // 设置 .action-rowtoggle 的 checked 特性的数值是否勾选
            // 有bug，多选框有一个未选中时不会自动取消
            $('.action-rowtoggle').attr('checked', allInputsChecked);
        });
    });
};
var modelActions = new AdminModelActions(JSON.parse($('#message-data').text()), JSON.parse($('#actions-confirmation-data').text()));
