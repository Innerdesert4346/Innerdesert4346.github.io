// Load different parts of the pages
$(function () {
    $.fn.selectpicker.Constructor.BootstrapVersion = '4';
    var trolls = ['[HEALED]', '[Air]'];
    var possibleStats =
        [
            'damage', 'armor', 'mainstat', 'allstat', 'strength', 'agility', 'intelligence', 'hp', 'mp', 'attackspeedpercent', 'movespeed', 'movespeedpercent',
            'dodgechancepercent', 'skilldamagepercent', 'critchancepercent', 'critmultiplier', 'periodicdamagepercent', 'mdpercent', 'drpercent', 'dtpercent',
            'healingpercent', 'healingreceivedpercent', 'hpregen', 'mpregen', 'affinityiwpercent', 'affinityflamepercent', 'affinityearthpercent', 'affinitywlpercent',
            'expreceivedpercent', 'revivaltimepercent'
        ];
    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-sm-4 col-md-2'f><'col-sm-6 col-md-3'l><'col-sm-4 col-md-7'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
    // var bullet = "∴";
    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');
    $.getJSON("json/commands.json", function (json) {
        $('#commands').DataTable({
            data: json,
            dom: dom,
            columns: [
                { data: "command", title: "Command" },
                { data: "usage", title: "Usage" },
                { data: "desc", title: "Description" },
                { data: "aliases", title: "Aliases" },
                { data: "cooldown", title: "Cooldown" }
            ]
        });
    });
    $.getJSON("json/items.json", function (json) {
        json = json.filter(x => !trolls.includes(x.type));

        var items_table = $('#items').DataTable({
            data: json,
            dom: dom,
            orderCellsTop: false,
            fixedHeader: true,
            columns: [
                { data: "name", title: "Name" },
                { data: "koreanname", title: "Korean Name", defaultContent: "<i>none</i>" },
                { data: "droprate", title: "Drop Rate",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        let str = [];
                        if (Array.isArray(data)) {
                            data.forEach(function(droprate){
                                str.push((Math.round(droprate * 10000) / 100) + "%");
                            });
                        }
                        else {
                            str.push((Math.round(data * 10000) / 100) + "%");
                        }
                        return str.join('<br>');
                    } 
                },
                { data: "type", title: "Item Type" },
                { data: "dropped_by", title: "Dropped By",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        return data.join("<br>");
                    }
                },
                { data: "required_by", title: "Used In",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        return data.join(" / ");
                    }
                },
                { data: "stats", title: "Stats", width: "10%",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        if (diff(possibleStats, Object.keys(data)).length <= 0) return "<i>none</i>";
                        let str = [];
                        Object.keys(data).forEach(function (stat) {
                            let val = data[stat];
                            let plusminus = ""
                            if (Number.isInteger(val) || isFloat(val)) {
                                if (val >= 0) plusminus = "+";
                                if (!['critmultiplier', 'hpregen', 'mpregen'].includes(stat)) {
                                    if (isFloat(val)) val = Math.round(val * 10000) / 100;
                                }
                            }
                            if (stat == 'damage') str.push(`${plusminus}${val} Damage`);
                            if (stat == 'armor') str.push(`${plusminus}${val} Armor`);
                            if (stat == 'mainstat') str.push(`${plusminus}${val} Main Stat`);
                            if (stat == 'allstat') str.push(`${plusminus}${val} All Stats`);
                            if (stat == 'strength') str.push(`${plusminus}${val} STR`);
                            if (stat == 'agility') str.push(`${plusminus}${val} AGI`);
                            if (stat == 'intelligence') str.push(`${plusminus}${val} INT`);
                            if (stat == 'hp') str.push(`${plusminus}${val} HP`);
                            if (stat == 'mp') str.push(`${plusminus}${val} MP`);
                            if (stat == 'attackspeedpercent') str.push(`${plusminus}${val}% Attack Speed`);
                            if (stat == 'movespeed') str.push(`${plusminus}${val} Movement Speed`);
                            if (stat == 'movespeedpercent') str.push(`${plusminus}${val}% Movement Speed`);
                            if (stat == 'dodgechancepercent') str.push(`${plusminus}${val}% Dodge Chance`);
                            if (stat == 'skilldamagepercent') str.push(`${plusminus}${val}% Skill Damage`);
                            if (stat == 'critchancepercent') str.push(`${plusminus}${val}% Crit Chance`);
                            if (stat == 'critmultiplier') str.push(`${plusminus}${val}x Crit Multiplier`);
                            if (stat == 'periodicdamagepercent') str.push(`${plusminus}${val}% Periodic Damage`);
                            if (stat == 'mdpercent') str.push(`${plusminus}${val}% Magic Defense`);
                            if (stat == 'drpercent') str.push(`${plusminus}${val}% Damage Reduction`);
                            if (stat == 'dtpercent') str.push(`${plusminus}${val}% Damage Taken`);
                            if (stat == 'healingpercent') str.push(`${plusminus}${val}% Healing`);
                            if (stat == 'healreceivedpercent') str.push(`${plusminus}${val}% Healing Received`);
                            if (stat == 'hpregen') str.push(`${plusminus}${val} HP regen`);
                            if (stat == 'mpregen') str.push(`${plusminus}${val} MP regen`);
                            if (stat == 'affinityiwpercent') str.push(`${plusminus}${val}% Ice/Water Affinity`);
                            if (stat == 'affinityflamepercent') str.push(`${plusminus}${val}% Flame Affinity`);
                            if (stat == 'affinityearthpercent') str.push(`${plusminus}${val}% Earth Affinity`);
                            if (stat == 'affinitywlpercent') str.push(`${plusminus}${val}% Wind/Lightning Affinity`);
                            if (stat == 'expreceivedpercent') str.push(`${plusminus}${val}% EXP Received`);
                            if (stat == 'revivaltimepercent') str.push(`${plusminus}${val}% Revival Time`);
                        });
                        return str.join('<br>');
                    }
                },
                { data: "stats.passive", title: "Passive", width: "20%",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        let str = [];
                        data.forEach(function (ps) {
                            str.push(ps);
                        });
                        return str.join("<br>");
                    }
                },
                { data: "stats.active", title: "Active", width: "20%",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        let str = [];
                        data.forEach(function (as) {
                            str.push(as);
                        });
                        return str.join("<br>");
                    }
                },
                { data: "stats.spec", title: "Character Specialties", width: "20%",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        let str = [];
                        data.forEach(function (ss, index) {
                            if (index == 0) { return; }
                            if (ss.match(/\s-\s/)) {
                                let specSplit = ss.split(' - ');
                                str.push(`${specSplit[0]} - ${specSplit[1]}`);
                            }
                            else {
                                str.push(ss);
                            }
                        });
                        return str.join("<br>");
                    }
                },
                { data: "recipe", title: "Recipe", width: "20%",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        let str = [];
                        data.forEach(function (rec) {
                            if (Object.keys(rec).length > 1) {
                                str.push(`<b><u>${Object.keys(rec)[0]}/${Object.keys(rec)[1]}</u></b>`);
                            }
                            else {
                                let count = rec[Object.keys(rec)] > 1 ? `x${rec[Object.keys(rec)]}` : '';
                                str.push(`${Object.keys(rec)} ${count}`);
                            }
                        });
                        return str.join(" + ");
                    }
                }
            ]
        });

        $('#items thead tr').clone(true).appendTo('#items thead');
        $('#items thead tr:eq(1) th').each(function (i) {
            $(this).removeAttr('class');
            $(this).removeAttr('aria-controls');
            $(this).removeAttr('aria-label');
            $(this).removeAttr('aria-sort');
            var title = $(this).text();
            $(this).html('<input type="text"class="form-control form-control-sm" placeholder="Search ' + title + '" />');

            $(this).on('click', function (e) {
                e.stopPropagation();
            });
            $('input', this).on({
                'keyup change': function () {
                    if (items_table.column(i).search() !== this.value) {
                        items_table
                            .column(i)
                            .search(this.value)
                            .draw();
                    }
                },
                'click': function(e){
                    e.stopPropagation();
                }
            });
        });

        var item_column_names = items_table.columns().header().toArray().map(x => x.innerText)
        item_column_names.forEach(function(column_name){
            var column_id = items_table.columns().header().toArray().map(x => x.innerText).indexOf(column_name);
            $('.items-select').append("<option value='" + column_id + "'>" + column_name + "</option>");
        });
        $('.items-select').selectpicker({
            actionsBox: true
        });

        $('.items-select').on('change', function(e){

            var values = $(this).val();
            values.forEach(function(id){
                var column = items_table.column(id);

                column.visible(!column.visible());
            });
        });
    });
});

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function diff(arr1, arr2) {
    var ret = [];
    for (var i in arr1) {
        if (arr2.indexOf(arr1[i]) > -1) {
            ret.push(arr1[i]);
        }
    }
    return ret;
}